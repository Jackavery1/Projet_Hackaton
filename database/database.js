const mongoose = require('mongoose');
require('dotenv').config();

const connecterBaseDeDonnees = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI); 
        console.log(' ✅ Bravo mon champion je suis fier de toi, tu as reussi a te connecter!✅');
    } catch (erreur) {
        console.error('T as encore merdé!:', erreur);
    }
};

module.exports = connecterBaseDeDonnees; 
