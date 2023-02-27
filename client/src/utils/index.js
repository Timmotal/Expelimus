import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constants";

export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

    const randomPrompt =  surpriseMePrompts[randomIndex];

    if(randomPrompt === prompt) return getRandomPrompt(prompt)
    // to prevent 2 same prompts in a row

    return randomPrompt;
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}