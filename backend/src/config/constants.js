module.exports ={
    MONGODB: {
        URI: process.env.DB_URI || "",
      },
      FILES: {
        UPLOAD_PATH: 'public/assets/uploads/',
        
      },

      BCRYPT: {
        SALT: 10
      },
}