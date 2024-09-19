# Kanban Board (Ongoing)

## To-Do:
- Build a Member Dashboard to view assigned tasks and track activity
- Implement RBA Auth - CRUD authority to boards in a project
- Implement BreadCrumbs component at the top level
- Complete Multi-Project setup
- Implement Home Page
- Implement Backend
- Re-Design theme (light & dark mode)
- Move from LocalStorage to SQLite
- Ability to lock column order
- Multiple project creation
- Re-Design mobile view
- FIX BUGS

  (non-exhaustive)
  
# Current Implementation

## v4.0.0-dev
   ### Features
  - Refined Drag N' Drop - Using overlay to avoid re-render on column change
  - Debounced DragOver Event for smoother Drag operation
  - Multi-Project Setup
      - A Project can have multiple boards
      - A Project can have multiple members
      - A Task in a board can be assigned to multiple members of that project
   
    <video width="630" height="300" src="https://github.com/user-attachments/assets/1b6e79be-23d9-4b3d-bc01-09f91ae94d9e"></video>    

## v3.0.0-dev
   ### Features
  - Keyboard actions for Task/Column Editing
  - Smoother Drag N' Drop for touch inputs
  - Refined Drag N' Drop - Using overlay to avoid re-render on column change
  - Revised Column/Task Editing

    ![image](https://github.com/user-attachments/assets/3ca8e0f9-3113-4050-b4bb-19218ade5f78)



## v2.0.1-dev
   ### Features
  - Drag N' Drop works for touch inputs
  - Refined Drag N' Drop
  - Revised Task View

  ![image](https://github.com/user-attachments/assets/10363059-634f-46da-b41f-fa3525d82d32)

## v2.1.0-dev
   ### Features
  - Refactored task form as Modal for each Column
  - Improved task readability
  - Better Responsiveness

  ![image](https://github.com/user-attachments/assets/18900c22-67bf-4173-9d65-e782b9b564b8)
  ![image](https://github.com/user-attachments/assets/6c0bee63-9e26-41f3-be49-127f3eb075f3)
  ![image](https://github.com/user-attachments/assets/09ac20ee-5d3f-443c-a330-8781b66b4ddc)

## v2.0.0-dev
   ### Features
  - Assign priority to tasks
  - Sort tasks by priority
  - Detailed task view - further future scope
  - Better column and task management

  ![image](https://github.com/user-attachments/assets/cf6493e9-9ad2-481c-acd9-4d4eef7aa3c5)


## v1.1.0-dev
   ### Features
  - Edit task name
  - Edit column name
  - Delete column - moves column items to previous columns

  ![image](https://github.com/user-attachments/assets/677c7c67-a34c-41df-b81e-822a73532f2c)

## v1.0.0-dev
  ### Features
  - Add infinite columns
  - Add tasks to columns
  - Delete tasks
  - Drag and drop tasks to any column or same column - sort tasks as required
  - Drag and drop columns - sort columns as required
  - Save and clear state

  ![image](https://github.com/user-attachments/assets/cb887e10-4eee-4b18-a1da-d4a6d36e6c7b)
