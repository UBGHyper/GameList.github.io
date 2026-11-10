const originalFetch = window.fetch;
var loadingText = document.querySelector("#loading-text");
    let totalBytes = 0;
    let loadedBytes = 0;

    async function fetchWithProgress(url) {
      const response = await fetch(url);
      const reader = response.body.getReader();
      let chunks = [];
      let received = 0;
      while (true) {
        const {
          done,
          value
        } = await reader.read();
        if (done) break;
        received += value.length;
        loadedBytes += value.length;
        chunks.push(value);
        let mbDone = (loadedBytes / (1024 * 1024)).toFixed(2);
        let mbTotal = '250.56';
        loadingText.textContent = `LOADING... ${mbDone} MB / ${mbTotal} MB`;
      }
      let fullBuffer = new Uint8Array(received);
      let offset = 0;
      for (let chunk of chunks) {
        fullBuffer.set(chunk, offset);
        offset += chunk.length;
      }
      return fullBuffer.buffer;
    }

    async function mergeFiles(fileParts, cacheKey) {
      const buffers = await Promise.all(
        fileParts.map(part => fetchWithProgress(part))
      );
      const mergedBlob = new Blob(buffers);
      return URL.createObjectURL(mergedBlob);
    }

    function getParts(file, start, end) {
      let parts = [];
      for (let i = start; i <= end; i++) {
        parts.push(file + ".part" + i);
      }
      return parts;
    }
Promise.all([
    mergeFiles(getParts("index2.pck", 1, 11), "index2.pck"),
    mergeFiles(getParts("index2.wasm", 1, 2), "index2.wasm")
]).then(([pckurl, wasmUrl]) => {
    window.fetch = async function (url, ...args) {
        if (url.endsWith("index2.pck")) {
            return originalFetch(pckurl, ...args);
        } else if (url.endsWith("index2.wasm")) {
            return originalFetch(wasmUrl, ...args);
        } else {
            return originalFetch(url, ...args);
        }
    };
    window.godotrunfunction();
});