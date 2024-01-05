import FileSaver from 'file-saver'
import {surpriseMePrompts} from '../constants/index';

export function getRandomPrompt(prompt) {
    const ind = Math.floor(Math.random() * surpriseMePrompts.length);
    if(prompt === surpriseMePrompts[ind]) return getRandomPrompt(prompt);
    return surpriseMePrompts[ind];
}

export async function downloadImage (_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
