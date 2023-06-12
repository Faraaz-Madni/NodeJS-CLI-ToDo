#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import fs from "fs";
import blessed from "blessed";


const filePath = "./tasks.json"
let debugOutput = " Test "
// Screen
let screen = blessed.screen(
    {
        smartCSR: true,
        title: 'To Do'
    }
)

// Boxes 
let box_top = blessed.box({
    top: 0,
    left: 0,
    width: '50%',
    height: '60%',
    border: {
        type: 'line'
    },
    style: {
        fg: 'white',
        border: {
            fg: '#f0f0f0'
        }
    }
})
screen.append(box_top);

let box_top_right = blessed.box({
    padding: 2,
    top: 0,
    left: '50%',
    width: '50%',
    height: '60%',
    content: debugOutput,
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        fg: 'white',
        border: {
            fg: '#f0f0f0',
        },

    }
})
screen.append(box_top_right);

let box_bottom = blessed.box({
    top: '60%',
    left: 0,
    width: '100%',
    height: '40%',
    border: {
        type: 'line'
    },
    style: {
        fg: 'white',
        border: {
            fg: '#f0f0f0'
        }
    }
})
screen.append(box_bottom);

// Task List
let task_list = blessed.list({
    parent: screen,
    top: 0,
    left: 0,
    width: '100%-2',
    height: '100%-2',
    keys: true,
    scrollbar: true,
    mouse: true,
    border: {
      type: 'line'
    },
    selectedBg: 'grey',
    style: {
      fg: 'white',
    },
      scrollbar: {
      ch: '',
      track: true,
      style: {
          bg: '#555555',
          fg: '#ffffff',
      },
      border: {
        type: 'line',
        bg: '#ffffff'
      }
    },
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Command 1',
      'Command 2',
      'Command 3',
      'Command 1',
      'Command 2',
      'Command 3',
      'Command 1',
      'Command 2',
      'Command 3',
    ]
})

box_top.append(task_list)

task_list.focus()


// Command List
let command_list = blessed.list({
    parent: screen,
    top: 0,
    left: 0,
    width: '50%',
    height: '100%-2',
    keys: true,
    scrollbar: true,
    mouse: true,
    border: {
      type: 'line',
    },
    selectedBg: 'grey',
    style: {
      fg: 'white',
    },
      scrollbar: {
      ch: '',
      track: true,
      style: {
          bg: '#555555',
          fg: '#ffffff',
      },
      border: {
        type: 'line',
        bg: '#ffffff'
      }
    },
    items: [
      'Command 1',
      'Command 2',
      'Command 3',
    ]
})
box_bottom.append(command_list)

// Text Labels for the boxes

const top_box_left_text = blessed.text({
    content: "Tasks"
})
box_top.append(top_box_left_text)

const bottom_box_text = blessed.text({
    content: "Commands"
})
box_bottom.append(bottom_box_text)

// Key Bindings
// Keys To Quit: Escape or Ctrl + C.
screen.key(['escape', 'C-c'], function() {
    return process.exit(0);
  });

// Press t to cycle through tasks
screen.key('t', function() {
    task_list.focus();
    command_list.selected = false;
});
  
// Press c to cycle through commands
screen.key('c', function() {
    command_list.focus();
    task_list.selected = false;
});



// Render the screen.
screen.render()

function readTasks(filePath){
        command_list.selected = false
        task_list.selected = false
        try{
        // Read the current contents of the tasks.json file
        const data = fs.readFileSync(filePath, 'utf8');
        } catch (err2){
            debugOutput = "{bold}First Time Setup{/bold}\n"
            debugOutput += "JSON Task File does not exist, creating..."
            box_top_right.setContent(debugOutput)
            screen.render()

        }
        setTimeout(() => {
        if (filePath){
            debugOutput = "{bold}First Time Setup{/bold}\n"
            debugOutput += "{bold}Task File Has Been Created.{/bold} \nWelcome To The Experience."
            box_top_right.setContent(debugOutput)
            screen.render()
        }
        setTimeout(() => {
            debugOutput = "{bold}Instructions{/bold}\n"
            debugOutput += "Press 't' to focus on tasks and 'c' to focus on commands.\n"
            debugOutput += "Once focused, press up and down arrow keys to navigate the lists.\n"
            debugOutput += "You can use your mouse to navigate too!"
            box_top_right.setContent(debugOutput)
            screen.render()
        }, 2000)
        }, 1000)

}


readTasks(filePath)

// Focus should be on one item at a time
task_list.on('mouse', function(){
        command_list.selected = false;
})

command_list.on('mouse', function(){
        task_list.selected = false;
})


// let priority_choices = ["Low", "Medium", "High"]

// const questions = [

// {
//     type: 'input',
//     name: 'task_name',
//     message: 'Add A Task:'

// },

// {
//     type: 'list',
//     name: 'task_priority',
//     message: 'Task Priority: ',
//     choices: priority_choices,
// }

// ]


 
// inquirer.prompt(questions).then((answers) => {
//     let tasks = [];

//     try{
//         try{
//         // Read the current contents of the tasks.json file
//         const data = fs.readFileSync(filePath, 'utf8');
//         } catch (err2){
//             console.log("Task File does not exist, creating...");
//         }
//     } catch(err){
//         console.log(err)
//     }

//         // Add the new task to the array
//         tasks.push(answers);
//     try{
//         // Write the updated contents back to the file
//         fs.writeFileSync(filePath, JSON.stringify(tasks));
//         console.log('Task added successfully!');
//     } catch(err){
//         console.log(err);
//     }
  
// })


