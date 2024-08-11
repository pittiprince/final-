import {atom} from 'recoil'

const weatherAtom = atom({
    key:"weatherAtom",
    default: async({get})=>{

    }
})



export const locationAtom = atom({
    key:"locationAtom",
    default:{
        lat:null,lon:null
    }
})