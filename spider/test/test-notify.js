const notifier = require('node-notifier');

let nFlag=false;
const notify = (title, message) => {
  // if(nFlag) return;
  // nFlag=true;
  notifier.notify({
    'title': title,
    'message': message,
    'wait': true,
  });

  notifier.on('timeout', function (notifierObject, options) {
    notifier.notify({
      'title': title,
      'message': message,
      'wait': true,
    });
  });
}
notify('1','1');
setTimeout(()=>{
  notify('2','2');
},8000)

