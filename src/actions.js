import {firebaseApp} from './firebase'
// import firebase from 'firebase'
import firebase from 'firebase/compat/app';
// require ('firebase/firestore')
import 'firebase/compat/firestore';
// import { collection } from 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

export const getCollection = async(collections) => {
    const result = {
        statusResponse : false,
        data : null,
        errro : null
    }

    try {
        const data = await db.collection(collections).get()
        const arrayData = data.docs.map(x => ({ id: x.id, ...x.data()}))
        result.statusResponse = true
        result.data = arrayData
    } catch (error) {
        result.errro = error
    }

    return result
}

export const addDocument = async(collection, data) => {
    const result = {
        statusResponse : false,
        data : null,
        errro : null
    }

    try {
        const response = await db.collection(collection).add(data)
        result.data = {id: response.id}
        result.statusResponse = true
    } catch (error) {
        result.errro = error
    }

    return result
}

export const getDocument = async(collection, id) => {
    const result = {
        statusResponse : false,
        data : null,
        errro : null
    }

    try {
        const response = await db.collection(collection).doc(id).get()
        result.data = {id: response.id, ...response.data()}
        result.statusResponse = true
    } catch (error) {
        result.errro = error
    }

    return result
}


export const updateDocument = async(collection, id, data) => {
    const result = {
        statusResponse : false,
        errro : null
    }

    try {
        await db.collection(collection).doc(id).update(data)
        result.statusResponse = true
    } catch (error) {
        result.errro = error
    }

    return result
}

export const deleteDocument = async(collection, id) => {
    const result = {
        statusResponse : false,
        errro : null
    }

    try {
        await db.collection(collection).doc(id).delete()
        result.statusResponse = true
    } catch (error) {
        result.errro = error
    }

    return result
}