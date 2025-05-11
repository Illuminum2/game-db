// https://stackoverflow.com/questions/41840766/nodejs-export-default-of-var-array-between-files-not-treated-correctly-at-impo
const games = [
    {
      "id": 0,
      "title": "BeatSaber",
      "genres": [["Music", "music", "music-note-beamed"], ["Sport", "sport", "dribbble"], ["Indie", "indie", "stars"]],
      "release": new Date("2019-02-21"),
      "description": "VR rhythm game where your goal is to slash the beats as they are coming at you",
      "platforms": [["PCVR [SteamVR]", "steamvr", "steam"], ["Meta Quest", "quest", "meta"]],
      "developer": "Beat Games",
      "publisher": "Beat Games",
      "logo": "https://bsaber.com/uploads/communities/bsmanager-bs-manager.png",
      "bg": "https://mixed-news.com/en/wp-content/uploads/2023/05/Beat-Saber-Schwerter-Bloecke.jpeg"
    },
    {
      "id": 1,
      "title": "Minecraft",
      "genres": [["Simulator", "simulator", "gear"], ["Adventure", "adventure", "compass"], ["Indie", "indie", "stars"]],
      "release": new Date("2016-12-19"),
      "description": "Build, explore, and survive in a blocky, open-world sandbox with limitless creativity",
      "platforms": [["PC [Windows]", "windows", "windows"], ["Nintendo Switch", "switch", "nintendo-switch"], ["Play Station", "playstation", "playstation"], ["X-Box", "xbox", "xbox"], ["iOS", "ios", "apple"], ["Android", "android", "android"]],
      "developer": "Mojang Studios",
      "publisher": "Mojang Studios",
      "logo": "https://cdn.prod.website-files.com/64ea57571d50b02423c4505d/64fa5f649846f59218adca46_minecraft%20logo%20png.png",
      "bg": "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/11/Minecraft-Promotional-Art.jpg"
    },
        {
      "id": 2,
      "title": "Bonelab",
      "genres": [["Shooter", "shooter", "crosshair"], ["Simulator", "simulator", "gear"], ["Adventure", "adventure", "compass"], ["Indie", "indie", "stars"]],
      "release": new Date("2022-09-29"),
      "description": "VR game where you embody an outcast escaping fate",
      "platforms": [["PCVR [SteamVR]", "steamvr", "steam"], ["Meta Quest", "quest", "meta"]],
      "developer": "Stress Level Zero",
      "publisher": "Stress Level Zero",
      "logo": "https://cdn2.steamgriddb.com/logo/702010521c85cf7460eedc602c8b1cea.png",
      "bg": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgI-akPTg8fpj8QWlEgj0CSlMemgGjmVNneQ&s"
    }
  ]

  export default games;