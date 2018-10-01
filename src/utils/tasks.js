var request = require('request');

class RequestTool {
    constructor(parent) {
        this._watcher = null;
        this._on = [];
        this._parent = parent;
        this.clean();
    }

    $(name,callback) {
      this.AddEvent(name, callback);
      return this;
    }

    AddEvent(name, callback) {
      this._on[name] = callback;
      return this;
    }

    EventCallback(name) {
        for (var x in this._on) {
           if (x == name) {
             if (this._on[x]) (this._on[x])(this);
             break;
           }
        }
    }
    EventCallbackMax() {
        var i = 0;
        for (var x in this._on) {
          i++;
        }
        return i;
    }

    EmitEvent(name) {
        this._events.push(name);
        this.EventCallback(name);
    }

    HasEvent(name) {
        for (var i = 0; i < this._events.length; i++) {
            if (this._events[i] == name) return true;
        }
        return false;
    }

    BeginWatch() {
        this._watcher = setInterval(()=>{
            if (this.HasEvent('done')) {
                clearInterval(this._watcher);
            }
        },100);

        return this._watcher;
    }

    RegisterEmitters(emitters) {
        for (var e in emitters) {
          this.$(e, emitters[e]);
        }
    }

    DoRequest(Request) {
        Request(this._header, (err,response,body)=>{
               if (err) {
                  this._error = err;
                  if (this.EventCallbackMax() == 0)
                    throw 'You may need to register an "error event callback" before use unindentified function models';
                  this.EmitEvent('error');
               } else if (response) {
                  if (response.statusCode != 200) {
                     var e = ' Got status:'+response.statusCode;
                     this._error = this._error ? this._error+' - '+e : e;
                     this.EmitEvent('error');
                  }
               }
               if (body) {
                  this._result = body;
                  this.EmitEvent('ok');
               }
               this.EmitEvent('done');
        });
    }

    do(method,headerURL,emitters) {
        this.clean();

        this._header = headerURL;

        if (emitters) {
          this.RegisterEmitters(emitters);
        }

        this.EventCallback('before');

        try {
            if (method == 'get') {
                this.DoRequest(request,headerURL);
            } else if (method == 'post') {
                this.DoRequest(request.post,headerURL);
            }
        } catch(e) {
            console.log(e);
        }
         
        return false;
    }

    clean() {
      this._header = null;
      this._result = null;
      this._error = null;
      this._events = [];
    }
}

class TaskModel {

   constructor(params) {
       if (params) {
           this._id = '';
           this._count = 0;
           this._toolName = null;
           this._toolHandler = null;
           this._callback = null;
           this._watcher = [];
           this.error = null;
           this.register(params);

           for (var i = 0; i < this._count; i++) {
              this.toolAttach();

              if (this._callback) {
                 this._callback(this._toolHandler,this);
              }
           }
       }
   }

   getTool() {
        switch (this._toolName) {
            case 'www':
                return new RequestTool(this);

            default:
                break;
        }
        return null;
   }

   register(params) {
        if (params.toolName && params.id && params.count && params.callback) {
            this._id = params.id;
            this._count = params.count;
            this._callback = params.callback;
            this._toolName = params.toolName;
            return;
        }
        this.error='Invalid params.';
   }

   toolAttach() {
        if (this._toolName) {
            var tool = this.getTool();
            if (tool) {
              this._toolHandler = tool;
              this._watcher.push(tool.BeginWatch());
              return;
            }
        }
        this.error='Invalid tool.';
   }

   clear() {
       for (var i = 0; i < this._count; i++)
         clearInterval(this._watcher[i]);
   }
}

const TaskHandler = {
    _handler: [],

    open(toolName,id,cb,count,extra) {
        var h = new TaskModel({toolName,id,callback:cb,count: (count ? count : 1)});
        if (h.error) throw h.error;
        this._handler.push(h);
        return true;
    },

    gethandler(id) {
      for (var i = 0; i < this._handler.length; i++){
       if (this._handler[i]._id == id) {
         return this._handler[i];
       }
      }
      return null;
    },

    error(id,r) {
     var h = this.gethandler(id);
     if (!h) return;
     if (h.error) {
       if (r) return h.error;
       else console.log(h.error);
     }
    },

    clean() {
      for(var i = 0; i < this._handler.length; i++)
        this._handler[i].clear();
    }
};

module.exports = TaskHandler;