// A mock function to mimic making an async request for data
export function fetchLink(link: string) {
    return new Promise((resolve, reject) =>{
      try{
        window.open(link, "_blank", "popup");
        setTimeout(() => resolve(link), 500);
      } catch(e) {
        setTimeout(() => reject("Failed to Open URL"), 500);
      }
    });
  }
  