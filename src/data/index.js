import covers from "../assets/images/covers";
import lyrics from "./lyrics";


const musicData = {
  released: [
    {
      id: 1,
      title: "Chini Ya Wabling",
      artist: "Acense",
      cover: covers.CYW,
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/so_17,du_30/v1765099954/chini_ya_wabling_cj8rpy.wav",
      explicit: true,
      releaseDate: "2024-01-18",
      producer: "Lemario",
      description: "A powerful track that captures the essence of street life and hustle in Nairobi's Eastlands.",
      links: {
        spotify: "https://open.spotify.com/track/7DpG1uEC6FiQivaZ3mZuUr?si=5e1563d7408440ad",
        appleMusic: "https://music.apple.com/us/album/chini-ya-wabling/1725505673?i=1725505674",
        deezer: "https://deezer.com/..."
      },
      lyrics: ''

    },
    {
      id: 2,
      title: "GOD Freestyle",
      artist: "Acense",
      cover: covers.GOD,
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/so_20,du_30/v1765103938/GOD_Freestyle_cvuzg9.mp3",
      explicit: true,
      releaseDate: "2023-04-03",
      producer: "Tyrelm",
      description: "A powerful track that captures the essence of street life and hustle in Nairobi's Eastlands.",
      links: {
        spotify: "https://open.spotify.com/track/7DpG1uEC6FiQivaZ3mZuUr?si=5e1563d7408440ad",
        appleMusic: "https://music.apple.com/us/album/chini-ya-wabling/1725505673?i=1725505674",
        deezer: "https://deezer.com/..."
      },
      lyrics: ''
    },
    {
      id: 3,
      title: "Loyal",
      artist: "Acense",
      cover: covers.Loyal,
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/so_25,du_30/v1765103932/Loyal_lh6w9v.mp3",
      explicit: true,
      releaseDate: "2023-11-30",
      producer: "Lemario",
      description: "A powerful track that captures the essence of street life and hustle in Nairobi's Eastlands.",
      links: {
        spotify: "https://open.spotify.com/track/7DpG1uEC6FiQivaZ3mZuUr?si=5e1563d7408440ad",
        appleMusic: "https://music.apple.com/us/album/chini-ya-wabling/1725505673?i=1725505674",
        deezer: "https://deezer.com/..."
      },
      lyrics: ''
    },
    {
      id: 4,
      title: "Shekinah",
      artist: "Acense",
      cover: covers.Shekinah,
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/so_59,du_30/v1765100055/shekinah_cwxmoo.wav",
      explicit: true,
      releaseDate: "2024-09-07",
      producer: "Lemario",
      description: "A powerful track that captures the essence of street life and hustle in Nairobi's Eastlands.",
      links: {
        spotify: "https://open.spotify.com/track/7DpG1uEC6FiQivaZ3mZuUr?si=5e1563d7408440ad",
        appleMusic: "https://music.apple.com/us/album/chini-ya-wabling/1725505673?i=1725505674",
        deezer: "https://deezer.com/..."
      },
      lyrics: ''
    },
    {
      id: 5,
      title: "Give Thanks",
      artist: "Acense ft. YOY Block",
      cover: covers.Givethanks,
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/so_17,du_30/v1765103930/Give_Thanks_ccw8zp.mp3",
      explicit: true,
      releaseDate: "2024-02-20",
      producer: "Lemario",
      description: "A powerful track that captures the essence of street life and hustle in Nairobi's Eastlands.",
      links: {
        spotify: "https://open.spotify.com/track/7DpG1uEC6FiQivaZ3mZuUr?si=5e1563d7408440ad",
        appleMusic: "https://music.apple.com/us/album/chini-ya-wabling/1725505673?i=1725505674",
        deezer: "https://deezer.com/..."
      },
      lyrics: ''
    },
    {
      id: 6,
      title: "Headache",
      artist: "Acense",
      cover: covers.Headache,
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/so_60,du_30/v1765099957/HeadAche2_obroxb.wav",
      explicit: true,
      releaseDate: "2023-08-21",
      producer: "Lemario",
      description: "A powerful track that captures the essence of street life and hustle in Nairobi's Eastlands.",
      links: {
        spotify: "https://open.spotify.com/track/7DpG1uEC6FiQivaZ3mZuUr?si=5e1563d7408440ad",
        appleMusic: "https://music.apple.com/us/album/chini-ya-wabling/1725505673?i=1725505674",
        deezer: "https://deezer.com/..."
      },
      lyrics: ''
    },
    {
      id: 7,
      title: "Ready Or Not",
      artist: "Acense x Miriam",
      cover: covers.RON,
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/so_33,du_30/v1765103952/Ready_Or_Not_Official_Audio_mbbbld.mp3",
      explicit: true,
      releaseDate: "2023-03-01",
      producer: "Tyrelm",
      description: "A powerful track that captures the essence of street life and hustle in Nairobi's Eastlands.",
      links: {
        spotify: "https://open.spotify.com/track/7DpG1uEC6FiQivaZ3mZuUr?si=5e1563d7408440ad",
        appleMusic: "https://music.apple.com/us/album/chini-ya-wabling/1725505673?i=1725505674",
        deezer: "https://deezer.com/..."
      },
      lyrics: ''
    },
    {
      id: 8,
      title: "OMO (On My Own)",
      artist: "Acense",
      cover: covers.OMO,
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/so_30,du_30/v1765103943/OMO_On_My_Own_ft._Dice_Mane_Official_Audio_TltDIPDyFJo_sokigs.mp3",
      explicit: true,
      releaseDate: "2023-02-06",
      producer: "Tyrelm",
      description: "A powerful track that captures the essence of street life and hustle in Nairobi's Eastlands.",
      links: {
        spotify: "https://open.spotify.com/track/7DpG1uEC6FiQivaZ3mZuUr?si=5e1563d7408440ad",
        appleMusic: "https://music.apple.com/us/album/chini-ya-wabling/1725505673?i=1725505674",
        deezer: "https://deezer.com/..."
      },
      lyrics: ''
    },
    {
      id: 9,
      title: "Strongest",
      artist: "Acense",
      cover: covers.Strongest,
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/so_19,du_30/v1765099926/strongest_master_pkilgx.wav",
      explicit: true,
      releaseDate: "2024-10-07",
      producer: "Lemario",
      description: "A powerful track that captures the essence of street life and hustle in Nairobi's Eastlands.",
      links: {
        spotify: "https://open.spotify.com/track/7DpG1uEC6FiQivaZ3mZuUr?si=5e1563d7408440ad",
        appleMusic: "https://music.apple.com/us/album/chini-ya-wabling/1725505673?i=1725505674",
        deezer: "https://deezer.com/..."
      },
      lyrics: ''
    },
    {
      id: 10,
      title: "Fathers Day",
      artist: "Acense",
      cover: 'https://res.cloudinary.com/bradley-cdn/image/upload/v1767436493/FD_xksr7s.jpg',
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/v1765100245/DAD_FREESTYLE_d0dnk6.wav",
      explicit: false,
      releaseDate: "2025-06-15",
      producer: "MVT on the track",
      description: "A powerful track that captures the essence of street life and hustle in Nairobi's Eastlands.",
      links: {
        spotify: "https://open.spotify.com/track/7DpG1uEC6FiQivaZ3mZuUr?si=5e1563d7408440ad",
        appleMusic: "https://music.apple.com/us/album/chini-ya-wabling/1725505673?i=1725505674",
        deezer: "https://deezer.com/..."
      },
      lyrics: ''
    },
    {
      id: 11,
      title: "Run This Town",
      artist: "Acense",
      cover: 'https://res.cloudinary.com/bradley-cdn/image/upload/v1767436493/RTT_nisfgs.jpg',
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/v1765100740/RUN_THIS_TOWN_AUDIO_rit9fo.wav",
      explicit: true,
      releaseDate: "2025-11-20",
      producer: "Mr. Mapema",
      description: "A powerful track that captures the essence of street life and hustle in Nairobi's Eastlands.",
      links: {
        spotify: "https://open.spotify.com/track/7DpG1uEC6FiQivaZ3mZuUr?si=5e1563d7408440ad",
        appleMusic: "https://music.apple.com/us/album/chini-ya-wabling/1725505673?i=1725505674",
        deezer: "https://deezer.com/..."
      },
      lyrics: ''
    },
    {
      id: 12,
      title: "Leo Ama Kesho",
      artist: "Acense",
      cover: 'https://res.cloudinary.com/bradley-cdn/image/upload/v1767436493/LAK_nbuymf.jpg',
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/v1767437039/LEO_AMA_KESHO_AUDIO_tunssa.wav",
      explicit: true,
      releaseDate: "2026-01-03",
      producer: "Mr. Mapema",
      description: "A powerful track that captures the essence of street life and hustle in Nairobi's Eastlands.",
      links: {
        spotify: "https://open.spotify.com/track/7DpG1uEC6FiQivaZ3mZuUr?si=5e1563d7408440ad",
        appleMusic: "https://music.apple.com/us/album/chini-ya-wabling/1725505673?i=1725505674",
        deezer: "https://deezer.com/..."
      },
      lyrics: ''
    },
    {
      id: 12,
      title: "Babyface Savage",
      artist: "Acense",
      cover: 'https://res.cloudinary.com/bradley-cdn/image/upload/v1767437284/BFS_ccpzhm.jpg',
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/v1765103944/Baby_Face_Savage_dojyau.mp3",
      explicit: true,
      releaseDate: "2022-06-05",
      producer: "Tyrelm",
      description: "A powerful track that captures the essence of street life and hustle in Nairobi's Eastlands.",
      links: {
        spotify: "https://open.spotify.com/track/7DpG1uEC6FiQivaZ3mZuUr?si=5e1563d7408440ad",
        appleMusic: "https://music.apple.com/us/album/chini-ya-wabling/1725505673?i=1725505674",
        deezer: "https://deezer.com/..."
      },
      lyrics: ''
    },
  ],
  unreleased: [
    {
      id: 1,
      title: "Valentino",
      artist: "Acense",
      cover: "https://res.cloudinary.com/bradley-cdn/image/upload/v1765106311/Valentino_usfj6j.png",
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/v1765099904/valentino_masterr_j9ebtj.wav",
      explicit: true,
      producer: "Lemario",
      description: "An unreleased gem exploring aspirations and struggles. Full track available for fans.",
      lyrics: ''
    },
    {
      id: 2,
      title: "Snakes n' Ladders",
      artist: "Acense",
      cover: "https://res.cloudinary.com/bradley-cdn/image/upload/v1765106317/SNL_pu15zv.png",
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/v1765015442/SNAKES_AND_LADDERS1_gxffwa.wav",
      explicit: true,
      producer: "Lemario",
      description: "An unreleased gem exploring aspirations and struggles. Full track available for fans.",
      lyrics: lyrics[1]
    },
    {
      id: 3,
      title: "She For Keeps",
      artist: "Acense",
      cover: "https://res.cloudinary.com/bradley-cdn/image/upload/v1765106316/SFK_nfcjte.png",
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/v1765100345/SHE_FOR_KEEPS_MASTER_nhng4l.wav",
      explicit: true,
      producer: "MVT on the Track",
      description: "An unreleased gem exploring aspirations and struggles. Full track available for fans.",
      lyrics: ''
    },
    {
      id: 4,
      title: "Streets",
      artist: "Acense",
      cover: "https://res.cloudinary.com/bradley-cdn/image/upload/v1765106315/Streets_v91hey.png",
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/v1765100668/STREETS_AUDIO_wlujbk.mp3",
      explicit: true,
      producer: "Mr. Mapema",
      description: "An unreleased gem exploring aspirations and struggles. Full track available for fans.",
      lyrics: ''
    },
    {
      id: 5,
      title: "Choppa Freestyle",
      artist: "Acense",
      cover: "https://res.cloudinary.com/bradley-cdn/image/upload/v1765106314/Choppa_f7mhtb.png",
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/v1765100230/CHOPPA_FREESTYLE_103BPM_master_wlmqhd.wav",
      explicit: false,
      producer: "MVT on the Track",
      description: "An unreleased gem exploring aspirations and struggles. Full track available for fans.",
      lyrics: ''
    },
    {
      id: 6,
      title: "Laho Freestyle",
      artist: "Acense x Angie",
      cover: "https://res.cloudinary.com/bradley-cdn/image/upload/v1765106313/Laho_gwupxq.png",
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/v1765100159/Laho1_mejdos.wav",
      explicit: true,
      producer: "Acense",
      description: "An unreleased gem exploring aspirations and struggles. Full track available for fans.",
      lyrics: ''
    },
    {
      id: 7,
      title: "El Jefe",
      artist: "Acense",
      cover: "https://res.cloudinary.com/bradley-cdn/image/upload/v1765106312/El-Jefe_daxtuy.png",
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/v1765100044/El_Jefe_1_f0tfgd.wav",
      explicit: true,
      producer: "Lemario",
      description: "An unreleased gem exploring aspirations and struggles. Full track available for fans.",
      lyrics: ''
    },
    {
      id: 8,
      title: "Bunda",
      artist: "Acense x Dice x Mahdboi 1",
      cover: "https://res.cloudinary.com/bradley-cdn/image/upload/v1765106312/Bunda_au910f.png",
      audioUrl: "https://res.cloudinary.com/bradley-cdn/video/upload/v1765099988/bunda1_v8wniw.wav",
      explicit: true,
      producer: "Lemario",
      description: "An unreleased gem exploring aspirations and struggles. Full track available for fans.",
      lyrics: ''
    },
  ]

};

export default musicData;

