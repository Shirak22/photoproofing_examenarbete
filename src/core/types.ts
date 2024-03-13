export interface TUser {
    userId: string,
    userName: string,
    role:string,
    joindDate: Date,
    storageLimit: number,
    usedStorage: number,
    companyName:string 
    address: string,
  }
  
export  interface TClient{
    clientId: string,
    clientName:string,
    address:string,
    photographerId:string,
    createdDate: Date,
    Albums: string[]  ,
    contact: {
        email: string,
        phone: string,
    },
  }

 export interface TImage {
    imageId: string,
    albumId: string,
    uploadDate?: Date,
    createdDate: Date,
    size: number,
    readableTitle: string,
    selected?: boolean,
    extension: string,
    path: string,
  }

  export interface TThumbnail {
    imageId: string,
    albumId: string,
    size: number,
    path: string,
  }
  
 export interface TAlbum {
    albumId: string,
    clientId: string,
    title:string,
    description:string,
    password:string,
    createdDate: Date,
    selectedLimit: number,
    images: string[]  ,
    confirmed: boolean, 
    proofing: boolean,
    albumUrl: string,
  }