const mongoose = require('mongoose');
require('dotenv').config();

const connecterBaseDeDonnees = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI); 
        console.log('Connecté à MongoDB avec succès !');
    } catch (erreur) {
        console.error('Erreur de connexion à MongoDB :', erreur);
    }
};

module.exports = connecterBaseDeDonnees; 