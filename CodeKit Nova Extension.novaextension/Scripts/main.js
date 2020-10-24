exports.activate = function() 
{
    nova.workspace.onDidChangePath(workspaceDidChangePath(), null);
}

exports.deactivate = function() 
{
    // nothing, currently
}









/// 
/// Internal Functions
/// ------------------------------------------------------------------------------------------------------------------


function addProjectToCodeKit()
{
    if (!nova.workspace.path) {
        return;
    }

    var scriptCommand = 'tell application "CodeKit" to add project at path "' + nova.workspace.path + '"';
    var options = {
        args: [ "-e", scriptCommand]
    };
        
    var process = new Process("/usr/bin/osascript", options);
    process.start();
}


function switchProjectInCodeKit()
{    
    if (!nova.workspace.path) {
        return;
    }
    
    var scriptCommand = 'tell application "CodeKit" to select project containing path "' + nova.workspace.path + '"';
    var options = {
        args: [ "-e", scriptCommand]
    };
    
    var process = new Process("/usr/bin/osascript", options);
    process.start();
}



function workspaceDidChangePath(newPath)
{    
    if (!nova.workspace.path) {
        return;
    }
    
    var autoAddProject = nova.config.get('com.CodeKitApp.Nova.autoAddProjects');
    
    // If the Project is already in CodeKit, this command will do nothing. We can safely call it regardless.
    if (autoAddProject == 'configFile')
    {
        // This isn't GREAT because any file with this name will trigger; we don't verify the file actually
        // contains CodeKit data. But I already feel dirty writing JavaScript and I don't wanna write more.
        // Not an edge case worth worrying about. No security risk if we add a junk project to CodeKit.
        var configFilePath = nova.workspace.path + "/config.codekit3";                  
        var configExists = (!nova.fs.stat(configFilePath)) ? false : true;
        
        if (!configExists) 
        {
            // CodeKit config files can optionally be hidden.
            var altConfigFilePath = nova.workspace.path + "/.config.codekit3";
            configExists = (!nova.fs.stat(altConfigFilePath)) ? false : true;
        }
        
        if (configExists) {
            addProjectToCodeKit();
        }
    }
    else if (autoAddProject == 'always') 
    {
        addProjectToCodeKit();
    }
    
    // If the Project was newly-added to CodeKit, it automatically gets selected and this call is superfluous. But if the
    // Project was already IN CodeKit (not newly added), this call is necessary because the "add Project" method will not
    // select the given Project if it's already in CodeKit; the method becomes a no-op.
    var autoSwitchProject = nova.config.get('com.CodeKitApp.Nova.autoSwitchProjects');
    if (autoSwitchProject == 'Yes')        
    {
        // This does nothing if the Project is already selected OR not in CodeKit.
        switchProjectInCodeKit();
    }
}








/// 
/// Nova Menu Commands
/// ------------------------------------------------------------------------------------------------------------------


///  Refresh Project
nova.commands.register("CodeKit.refreshProject", (workspace) => 
{
    if (!nova.workspace.path) 
    {
        nova.workspace.showInformativeMessage(
            nova.localize("This workspace has no path; it cannot be refreshed in CodeKit.")
        );
        return;
    }
      
    var scriptCommand = 'tell application "CodeKit" to refresh project containing path "' + workspace.path + '"';
    var options = {
        args: ["-e", scriptCommand]
    };
    var process = new Process("/usr/bin/osascript", options);
    
    var lines = [];
    process.onStderr(function (data) {
        if (data) {
            lines.push(data);
        }
    });
      
    process.onDidExit(function (status) {
        if (status != 0) {
            nova.workspace.showInformativeMessage(
                nova.localize("Error:") + "\n\n" + lines.join("")
            );
        }
    });
      
    process.start();
});



///  Build Project
nova.commands.register("CodeKit.buildProject", (workspace) => 
{
    if (!nova.workspace.path) 
    {
        nova.workspace.showInformativeMessage(
            nova.localize("This workspace has no path; it cannot be built in CodeKit.")
        );
        return;
    }
      
    var scriptCommand = 'tell application "CodeKit" to build project containing path "' + workspace.path + '"';
    var options = {
        args: [ "-e", scriptCommand]
    };
    var process = new Process("/usr/bin/osascript", options);
    
    var lines = [];
    process.onStderr(function (data) {
        if (data) {
            lines.push(data);
        }
    });
      
    process.onDidExit(function (status) {
        if (status != 0) {
            nova.workspace.showInformativeMessage(
                nova.localize("Error:") + "\n\n" + lines.join("")
            );
        }
    });
      
    process.start();
});



/// Show App
nova.commands.register("CodeKit.showApp", (workspace) =>
{
    var options = {
        args: [ "-a", "CodeKit"]
    };
    var process = new Process("/usr/bin/open", options);
    
    process.onDidExit(function (status) {
        if (status != 0) 
        {
            // This is really the only likely error here, bar serious system corruption.
            nova.workspace.showErrorMessage(
                nova.localize("CodeKit could not be opened. Be sure the app is installed in your /Applications folder and that you're running the latest version.")
            );
        }
    });
      
    process.start();
});



/// Preview In Browser
nova.commands.register("CodeKit.previewProject", (workspace) => 
{
   var scriptCommand = 'tell application "CodeKit" to preview in browser using local feedback address';
   var options = {
       args: [ "-e", scriptCommand]
   };
   var process = new Process("/usr/bin/osascript", options);
   process.start();
});