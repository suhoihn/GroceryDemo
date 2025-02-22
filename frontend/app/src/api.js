import axios from 'axios';

const giveSomeYummyStuff = async (name, quantity) => {
    const newRecipe = "It's just a string?!";

    try {
        const response = await axios.post("http://localhost:5000/api/addTest", {
            name: name,
            quantity: quantity,
        });
        //changeMsg(response.data.message);
        console.log("ok", response);
    } catch (e) {
        console.log("Error! DEBUG MY ASSSSSSSSSSSSSS!");
        console.log(e);
    }
}

export default giveSomeYummyStuff;