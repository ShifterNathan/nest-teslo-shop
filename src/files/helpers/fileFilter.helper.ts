

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function) => {

    if ( !file ) return callback( new Error('No file was provided'), false )

    const fileExtension = file.mimetype.split('/')[1];
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (validExtensions.includes( fileExtension )){
      // null: no errors, true: the file was accepted
      return callback(null, true)
    }
    callback( null, false );
}