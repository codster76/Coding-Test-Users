import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  // Generates an rgb value based on. Minimum brightness exists so that that the colour can't be too dark to read text on.
  generateColourFromName(name: string, minimumBrightness: number = 0) {
    // Filter out all non-alphabet characters
    let filteredString = name.toLowerCase().replace(/[^a-z]/g, '');

    // Add values if there aren't enough
    while(filteredString.length < 3) {
      filteredString += 'a';
    }

    let splitBreakpoints = Math.round(filteredString.length/3);
    let red: number = 0, blue: number = 0, green: number = 0;

    for(let i = 0;i<splitBreakpoints;i++) {
      red += filteredString.charCodeAt(i) - 97;
    }

    red = red/splitBreakpoints; // Get average of alphabet value
    red = red/25; // Get the value as a percentage of the way through the alphabet
    red = Math.round(red*255); // Map that to a value between 0-255 for an rgb value
    red = Math.max(minimumBrightness, red);

    for(let i = splitBreakpoints;i<splitBreakpoints*2;i++) {
      green += filteredString.charCodeAt(i) - 97;
    }

    green = green/splitBreakpoints; // Get average of alphabet value
    green = green/25; // Get the value as a percentage of the way through the alphabet
    green = Math.round(green*255); // Map that to a value between 0-255 for an rgb value
    green = Math.max(minimumBrightness, green);

    for(let i = splitBreakpoints*2;i<filteredString.length;i++) {
      blue += filteredString.charCodeAt(i) - 97;
    }

    blue = blue/(filteredString.length - splitBreakpoints*2); // Get average of alphabet value
    blue = blue/25; // Get the value as a percentage of the way through the alphabet
    blue = Math.round(blue*255); // Map that to a value between 0-255 for an rgb value
    blue = Math.max(minimumBrightness, blue);

    return `rgb(${red},${green},${blue})`
  }

  getInitials(name: string) {
    let splitName;
    try {
      splitName = name.split(' ');
    } catch {
      throw "Invalid input";
    }

    if(splitName.length < 2) {
      return name.charAt(0).toUpperCase();
    } else {
      return splitName[0].charAt(0).toUpperCase() + splitName[1].charAt(0).toUpperCase();
    }
  }
}
