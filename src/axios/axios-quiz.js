import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-458fb-default-rtdb.europe-west1.firebasedatabase.app/'
})