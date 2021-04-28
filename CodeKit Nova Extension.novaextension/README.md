![The CodeKit Application Icon](https://codekitapp.com/images/logo.svg)

# Introduction
This Extension links Nova and CodeKit (<https://codekitapp.com>) so you can work faster. It requires CodeKit 3.13+ and Nova 2+.


## Automatic Project-Adding
When you open a new Workspace in Nova, this Extension can (optionally) add the root folder of that Workspace to CodeKit as a Project, if it's not already in CodeKit.

By default, this will happen whenever there is a "config.codekit3" file in the root folder of the Workspace. In the Extension preferences, you can change this behavior to add *every* Workspace root folder to CodeKit as a Project, or to never add any Projects to CodeKit.


## Automatic Project-Switching
When you open a new Workspace in Nova and that Workspace's root folder is also a Project in CodeKit, this Extension can (optionally) automatically select that Project in CodeKit. The default for this behavior is ON, but you can turn it off in the Extension's preferences.


## Additional Commands
In Nova's "Extensions" menu, you'll find a variety of CodeKit commands that you can trigger from within Nova. This includes building a Project, refreshing a Project, adding the current Workspace's root folder as a new CodeKit Project, and switching to CodeKit itself. Additional commands will come in future updates to this Extension.

## Syntax Highlighting
Files with the .kit extension will automatically use syntax highlighting for variables and includes/imports.

## Clips
The extension comes with three clips/snippets:

- **Define variable** (trigger: `var`)
- **Insert variable value** (trigger: `val`)
- **Include file** (trigger: `inc`)


## Limitations
If you have multiple Nova Workspaces open, this Extension cannot currently detect when you switch between them. As such, it cannot auto-switch Projects in CodeKit. Projects will be added and switched *only* when a new Workspace is opened.

If you open a single file in Nova or you open a remote resource that isn't associated with a folder on your disk, this Extension will not add any Projects to CodeKit. You should open the root folder of your Project in Nova, instead.


## The Future
I'm working with Panic to get new Nova APIs added. In the future:

- You'll see file-processing and build log entries directly in Nova.
- Clicking Nova's Preview button will open CodeKit's Preview Server address.
- You'll be able to add a "Build with CodeKit" task.

I'm excited to have a first-class, modern, NATIVE editor on macOS again and I look forward to supporting it as much as I can.


## Support
Contact bryan@codekitapp.com
