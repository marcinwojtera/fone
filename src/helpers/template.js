import ejs from 'ejs';

const template = `
  <!DOCTYPE html>
             <head lang="en">
                 <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                   <meta charset="UTF-8">
                    <meta name="description" content="F1 statistics description">
                    <meta name="keywords" content="F1, statistic f1, races">
                    <meta name="author" content="MWoj">
                 <link rel="icon" href="favicon.ico" type="image/x-icon" />
                 <% css.forEach(function(cssUrl) { %><link href="../../../../<%= cssUrl %>" rel="stylesheet" type="text/css"><% }); %>
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
                   // chunk.async = true;
                   chunk.async = true;
                   chunk.src = "../../"+elem;
                   document.head.appendChild(chunk);
                 });
               </script>
               <title>F1 statistics</title>
             </head>
            <body>
            <div id="root"><%- markup -%></div>
   </body>
  </html>
`;

export default data => ejs.render(template, data);
