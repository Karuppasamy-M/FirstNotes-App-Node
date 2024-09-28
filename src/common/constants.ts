

class Constants {

    jwtKey = {
        secretKey: 'notesApp17',
        exp_time: '30d'
    }

    limitNumber: number = 10;


    // Error Messages : 

    err = {
        other: "Internal error.",

        // AuthRouter
        userAlreadyExist: "User already exist",
        userDoesNotExist: "User does not exist",


        //CategoryRouter
        categoryAlreadyExist: "Category already exist",

        subCategoryAlreadyExist: "SubCategory already exist",
        subCategoryNameAlreadyExist: "SubCategory name already exist",

        //Notes
        noteAlreadyExist: "Note already exist",
        noteNameAlreadyExist: "Note name already exist",

        taskAlreadyExist: "Task already exist",
        taskNameAlreadyExist: "Task same already exist",


    }





}

export const constants = new Constants();
export default constants;