import mongoose, { Schema, Types } from 'mongoose'

export interface ITransaction {}

const schema = new Schema<ITransaction>({})

export const Transaction = mongoose.model('Transaction', schema)
