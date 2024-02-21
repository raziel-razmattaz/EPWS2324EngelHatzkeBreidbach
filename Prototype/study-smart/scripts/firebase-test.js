import { db } from "../firebase/firebase-setup.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

async function getMyCollection() {
    var toGet = "section" + "01"; //so we can cycle through
    const querySnapshot = await getDocs(collection(db, toGet));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
    const items = querySnapshot.docs.map(x => ({id: x.id, data: x.data()}))
    const json = JSON.stringify(items, null, 2);
    const jsonArray = JSON.parse(json)
    console.log(jsonArray.find(item => item.id === "content").data["1"]);
    console.log(jsonArray.find(item => item.id === "header").data["1"]);
    console.log(jsonArray.find(item => item.id === "choices").data["0"].text);
    console.log(jsonArray.find(item => item.id === "choices").data["0"].jump);
}

export async function getContent(sectionID) {
  try {
    const querySnapshot = await getDocs(collection(db, sectionID));
    const items = querySnapshot.docs.map(x => ({ id: x.id, data: x.data() }));
    const json = JSON.stringify(items, null, 2);
    const jsonArray = JSON.parse(json);
    const contentData = jsonArray.find(item => item.id === "content").data["1"];
    return contentData;
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error; // Re-throw the error to be caught by the calling function
  }
}

export async function getHeader(sectionID) {
  try {
    const querySnapshot = await getDocs(collection(db, sectionID));
    const items = querySnapshot.docs.map(x => ({id: x.id, data: x.data()}))
    const json = JSON.stringify(items, null, 2);
    const jsonArray = JSON.parse(json)
    const header = jsonArray.find(item => item.id === "header");
    if (header != null) {
      return header.data["1"];
    } else {
      return null
    }
  } catch (error) {
    console.error("Error fetching header:", error);
    throw error; // Re-throw the error to be caught by the calling function
  }
}

export async function getChoices(sectionID) {
  const querySnapshot = await getDocs(collection(db, sectionID));
  const items = querySnapshot.docs.map(x => ({id: x.id, data: x.data()}))
  const json = JSON.stringify(items, null, 2);
  const jsonArray = JSON.parse(json)
  const choices = jsonArray.find(item => item.id === "choices");
  if (choices && choices.data) {
    let choiceArray = [];
    const keys = Object.keys(choices.data);
    keys.forEach(key => {
      const element = choices.data[key];
      choiceArray.push([element.jump, element.text]);
    });
    return choiceArray;
  }
}

//getMyCollection();




