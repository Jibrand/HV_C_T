// import React, { useEffect } from 'react';

// const DialogflowMessenger = () => {
//   useEffect(() => {
//     // Dynamically load the Dialogflow Messenger script
//     const script = document.createElement('script');
//     script.src = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js';
//     script.async = true;
//     document.body.appendChild(script);

//     // Dynamically load the Dialogflow Messenger styles
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = 'https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css';
//     document.head.appendChild(link);

//     return () => {
//       // Clean up script and link elements when the component unmounts
//       document.body.removeChild(script);
//       document.head.removeChild(link);
//     };
//   }, []);

//   return (
//     <>
//       <df-messenger
//         location="us-central1"
//         project-id="tidal-triumph-412112"
//         agent-id="479a9f74-89b7-4795-b014-b043a4412bf2"
//         language-code="en"
//         max-query-length="-1">
//         <df-messenger-chat-bubble chat-title="Call Companion" />
//       </df-messenger>
//       <style>
//         {`
//           df-messenger {
//             z-index: 999;
//             position: fixed;
//             --df-messenger-font-color: #000;
//             --df-messenger-font-family: Google Sans;
//             --df-messenger-chat-background: #f3f6fc;
//             --df-messenger-message-user-background: #d3e3fd;
//             --df-messenger-message-bot-background: #fff;
//             bottom: 16px;
//             right: 16px;
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default DialogflowMessenger;

 import React from 'react'
 
 const DialogFlow = () => {
   return (
     <div>DialogFlow</div>
   )
 }
 
 export default DialogFlow