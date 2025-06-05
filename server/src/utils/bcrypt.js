import bcrypt from 'bcrypt'

export const passwordHash = async(password) => {
    const hashedPassword = await bcrypt.hash(password,10)
    return hashedPassword
}

export const passwordCompare = async(password,hashedPassword) => {
    return await bcrypt.compare(password,hashedPassword)
}