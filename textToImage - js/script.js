// document.getElementById("generateBtn").addEventListener("click", async function(){


//     let token =''
//     let input = document.getElementById("textInput");
//     let imageContainer = document.getElementById("imageContainer");

//     async function generateImage(data) {
//         const response = await fetch(
//             "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     // "Content-Type": "application/json",
//                 },
//                 method: "POST",
//                 body: JSON.stringify({ "inputs": input }),
//             }
//         );
//         console.log(response);
//         const result = await response.blob();
//         return result;
//         if(!response.ok){
//             throw new Error("API error");
//         }




//         try {
//             let imagelob = await generateImage(input);
//             let imageUrl = URL.createObjectURL(imagelob);
//             imageContainer.innerHTML = `<img src ="${imageUrl}"class = "mx-auto rounded-lg shadow-lg" />`


//         } catch (error) {console.error("Error generating images:", error);
//         }
//     }

//     // generateImage().then((response) => {
//     //     // Use image
//     // });
// });


document.getElementById("generateBtn").addEventListener("click", async function () {
    
    let token = '';
    let input = document.getElementById("textInput").value.trim();
    let imageContainer = document.getElementById("imageContainer");
    let downloadBtn = document.getElementById("downloadBtn")

    if (!input) {
        alert("Please enter a prompt for the image!");
        return;
    }

    async function generateImage(data) {
        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({ "inputs": data }),
                }
            );

            if (!response.ok) {
                throw new Error("API error: " + response.statusText);
            }

            const result = await response.blob();
            return result;

        } catch (error) {
            console.error("Error generating images:", error);
            alert("Failed to generate image. Try again later!");
        }
    }

    try {
        let imageBlob = await generateImage(input);
        if (imageBlob) {
            let imageUrl = URL.createObjectURL(imageBlob);
            imageContainer.innerHTML = `<img src="${imageUrl}" class="mx-auto rounded-lg shadow-lg mt-5" />`;

            const downloadBtn = document.createElement('button');
            downloadBtn.innerHTML = "Download Imaage"
            downloadBtn.classList.add('mt-5','w-full','bg-blue-500','rounded-lg','px-6','py-6')
            downloadBtn.addEventListener("click", function () {
                const link = document.createElement('a')
                link.href = imageUrl;
                link.download = 'generated-images.png'
                link.click();
            })

            imageContainer.appendChild(downloadBtn);

        }
    } catch (error) {
        console.error("Image processing error:", error);
    }
});

















