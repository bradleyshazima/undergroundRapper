import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { Download as DownloadIcon, FolderDown, Music, ArrowLeft, Loader2 } from 'lucide-react';
import { Navbar } from '../components';
import { useState, useEffect } from 'react';

const Download = () => {
  const location = useLocation();
  const { email, product } = location.state || {};

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (!backendUrl) console.error('VITE_BACKEND_URL is not set — check your deployment env vars');
  const [orders, setOrders] = useState([]);
  const [filesLoading, setFilesLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [downloadingKey, setDownloadingKey] = useState(null);
  const [downloadErrors, setDownloadErrors] = useState({});

  useEffect(() => {
    if (!email) return;
    const fetchFiles = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/payments/get-files`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        setOrders(data.orders || []);
      } catch (err) {
        console.error('Vault fetch failed:', err.message);
        setFetchError(err.message || 'Could not load your purchases.');
      } finally {
        setFilesLoading(false);
      }
    };
    fetchFiles();
  }, [email]);


  // Protect route: if no email passed, send them back to shop
  if (!email) {
    return <Navigate to="/shop" />;
  }

  const handleDownload = async (fileKey, orderId) => {
    setDownloadingKey(fileKey);
    setDownloadErrors(prev => ({ ...prev, [fileKey]: null }));
    try {
      const res = await fetch(`${backendUrl}/api/payments/request-download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, file_key: fileKey, order_id: orderId }),
      });
      const data = await res.json();
      if (!data.success) {
        setDownloadErrors(prev => ({ ...prev, [fileKey]: data.message }));
        return;
      }
      const a = document.createElement('a');
      a.href = data.url;
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Reflect new count in UI immediately
      setOrders(prev => prev.map(order => {
        if (order.order_id !== orderId) return order;
        return {
          ...order,
          files: order.files.map(f =>
            f.file_key === fileKey ? { ...f, downloads_remaining: data.downloads_remaining } : f
          ),
          zip: order.zip?.file_key === fileKey
            ? { ...order.zip, downloads_remaining: data.downloads_remaining } : order.zip,
          single: order.single?.file_key === fileKey
            ? { ...order.single, downloads_remaining: data.downloads_remaining } : order.single,
        };
      }));
    } catch {
      setDownloadErrors(prev => ({ ...prev, [fileKey]: 'Download failed. Please try again.' }));
    } finally {
      setDownloadingKey(null);
    }
  };

return (
  <>
    <Navbar />
    <section className="min-h-screen pt-24 pb-12 px-4 md:px-20 abstract-bg">
      <div className="max-w-4xl mx-auto">

        <Link to="/shop" className="inline-flex items-center gap-2 text-white/50 hover:text-[#d24700] text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>

        <div className="mb-8">
          <h1 className="jakarta text-3xl md:text-5xl font-black uppercase text-white">Digital Vault</h1>
          <p className="text-white/60 mt-2">
            Access granted for <span className="text-[#d24700] font-bold">{email}</span>
          </p>
        </div>

        {/* Loading */}
        {filesLoading && (
          <div className="bg-[#0a0a0a] border border-white/10 p-12 text-center animate-pulse">
            <p className="text-white/40 jakarta uppercase tracking-widest text-xs">Checking your purchases...</p>
          </div>
        )}

        {/* No purchases / error */}
        {!filesLoading && fetchError && (
          <div className="bg-[#0a0a0a] border border-white/10 p-12 text-center">
            <h2 className="jakarta text-2xl font-black uppercase mb-3 text-white">No Purchases Found</h2>
            <p className="text-white/50 text-sm mb-6 max-w-sm mx-auto">{fetchError}</p>
            <Link to="/shop" className="inline-block bg-[#d24700] text-white px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors">
              Visit the Store
            </Link>
          </div>
        )}

        {/* Orders */}
        {!filesLoading && !fetchError && (
          <div className="space-y-6">
            {(orders || []).map((order) => (
              <div key={order.order_id} className="bg-[#0a0a0a] border border-white/10 p-8 md:p-10">

                {/* Order header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                  <div>
                    <h2 className="jakarta text-xl font-bold uppercase text-white">{order.product_title}</h2>
                    <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">
                      Purchased {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>

                  {/* ZIP button */}
                  {order.zip && (
                    <button
                      onClick={() => handleDownload(order.zip.file_key, order.order_id)}
                      disabled={order.zip.downloads_remaining === 0 || downloadingKey === order.zip.file_key}
                      className="flex items-center gap-2 bg-[#d24700] text-white px-5 py-3 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      {downloadingKey === order.zip.file_key ? <Loader2 className="w-4 h-4 animate-spin" /> : <FolderDown className="w-4 h-4" />}
                      {order.zip.downloads_remaining === 0 ? 'Zip Limit Reached' : `Full ZIP (${order.zip.downloads_remaining} left)`}
                    </button>
                  )}

                  {/* Single file button */}
                  {order.single && (
                    <button
                      onClick={() => handleDownload(order.single.file_key, order.order_id)}
                      disabled={order.single.downloads_remaining === 0 || downloadingKey === order.single.file_key}
                      className="flex items-center gap-2 bg-[#d24700] text-white px-5 py-3 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      {downloadingKey === order.single.file_key ? <Loader2 className="w-4 h-4 animate-spin" /> : <DownloadIcon className="w-4 h-4" />}
                      {order.single.downloads_remaining === 0 ? 'Download Limit Reached' : `Download (${order.single.downloads_remaining} left)`}
                    </button>
                  )}
                </div>

                {/* ZIP error */}
                {order.zip && downloadErrors[order.zip.file_key] && (
                  <p className="text-red-400 text-xs mb-4">{downloadErrors[order.zip.file_key]}</p>
                )}
                {order.single && downloadErrors[order.single.file_key] && (
                  <p className="text-red-400 text-xs mb-4">{downloadErrors[order.single.file_key]}</p>
                )}

                {/* Individual tracks */}
                {order.files.length > 0 && (
                  <div>
                    <h3 className="text-xs text-white/40 uppercase tracking-widest font-bold mb-4">Individual Tracks</h3>
                    <div className="border-t border-white/10">
                      {order.files.map((file) => (
                        <div key={file.id}>
                          <div className="flex items-center justify-between py-4 group hover:bg-white/5 px-3 -mx-3 transition-colors">
                            <div className="flex items-center gap-4">
                              <Music className="w-4 h-4 text-white/30 group-hover:text-[#d24700] flex-shrink-0" />
                              <div>
                                <span className="text-sm font-semibold tracking-wider text-white/80 group-hover:text-white transition-colors block">
                                  {file.name}
                                </span>
                                {file.downloads_remaining === 0 && (
                                  <span className="text-[10px] text-red-400/70 uppercase tracking-widest">Download Limit reached</span>
                                )}
                                {downloadErrors[file.file_key] && (
                                  <span className="text-[10px] text-red-400 block">{downloadErrors[file.file_key]}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-[10px] text-white/30 uppercase tracking-widest hidden sm:block">
                                {file.downloads_remaining}/2 left
                              </span>
                              <button
                                onClick={() => handleDownload(file.file_key, order.order_id)}
                                disabled={file.downloads_remaining === 0 || downloadingKey === file.file_key}
                                title={file.downloads_remaining === 0 ? 'Download limit reached' : `Download ${file.name}`}
                                className="text-white/50 hover:text-white disabled:text-white/20 disabled:cursor-not-allowed transition-all p-2"
                              >
                                {downloadingKey === file.file_key
                                  ? <Loader2 className="w-4 h-4 animate-spin" />
                                  : <DownloadIcon className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                          <div className="border-t border-white/5" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-[10px] text-white/30 uppercase tracking-widest mt-10">
          Having trouble? Contact support at itsacense@gmail.com
        </p>

      </div>
    </section>
  </>
);
};

export default Download;