import ejs from 'ejs';

const template = `
  <!DOCTYPE html>
             <head>
                 <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                 <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                 <link rel="icon" href="favicon.ico" type="image/x-icon" />
                 <% css.forEach(function(cssUrl) { %><link href="../../<%= cssUrl %>" rel="stylesheet" type="text/css"><% }); %>
                 <script>
                 var favIcon = "favicon.ico";
                  var docHead = document.getElementsByTagName('head')[0];       
                  var newLink = document.createElement('link');
                  newLink.rel = 'shortcut icon';
                  newLink.href = 'data:image/png;base64,'+favIcon;
                  docHead.appendChild(newLink);
                  window.__PRELOADED_STATE__ = <%- JSON.stringify(state) -%>;
                 </script>
                 <script>
                 let js = "<%= js %>";
                 let script = js.split(',');
                 script.forEach(function(elem){
                   let chunk = document.createElement('script');
                   chunk.async = false;
                   chunk.src = "../../"+elem;
                   document.head.appendChild(chunk);
                 });
               </script>
             </head>
            <body>
            <div id="root"><%- markup -%></div>
   </body>
  </html>
`;

export default data => ejs.render(template, data);
