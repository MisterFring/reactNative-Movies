import axios from 'axios';
// import { DB_KEY } from 'react-native-dotenv'




class TMDB {
    constructor(){
        this.movies = this.apiGet()
    }
    async apiGet() {
        // https://api.themoviedb.org/3/movie/550?api_key=
        let test = []
        const azaz = axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=' + 'd89f44ef7b82944aedf327888bbcccab')
            .then(res => {
                test = [...res.data.results];
                console.log('raaaaaa : ' + res.data.results[0].original_title)
                return res.data.results
            })
            .catch( error => {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                throw error;
            });
        console.log('TEEEEEEEEEST ::::: ' + azaz.length);
        
        return  JSON.stringify(test);
    }
}

export default TMDB