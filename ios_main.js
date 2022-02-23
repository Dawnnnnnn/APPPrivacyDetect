function showStacks(ctx) {
    console.log("============================= Stack strat=======================");
    console.log("");
    console.log(
      "\tBacktrace:\n\t" +
        Thread.backtrace(ctx, Backtracer.ACCURATE)
          .map(DebugSymbol.fromAddress)
          .join("\n\t")
    );
    console.log("");
    console.log("============================= Stack end=======================\r\n");
  }


Interceptor.attach(
    ObjC.classes.UIDevice["- name"].implementation,
    {
        onLeave: function(retval){
            var message = ObjC.Object(retval);
            var ctx = this.context;
            showStacks(ctx);
            console.log('device_name:' + message.toString());
        }

    }
);

Interceptor.attach(
    ObjC.classes.ASIdentifierManager["- advertisingIdentifier"].implementation,
    {
        onLeave: function(retval){
            var message = ObjC.Object(retval);
            var ctx = this.context;
            showStacks(ctx);
            console.log('advertisingIdentifier(idfa):' + message.toString());
        }

    }
);

Interceptor.attach(
    ObjC.classes.UIDevice["- identifierForVendor"].implementation,
    {
        onLeave: function(retval){
            var message = ObjC.Object(retval);
            var ctx = this.context;
            showStacks(ctx);
            console.log('identifierForVendor(idfv):' + message.toString());
        }

    }
);

Interceptor.attach(
    ObjC.classes.NSProcessInfo["- systemUptime"].implementation,
    {
        onLeave: function(retval){
            var ctx = this.context;
            showStacks(ctx);
            console.log('systemUptime:' + retval
            );
        }

    }
);