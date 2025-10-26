declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      MONGO_LOCAL_URI: string
      NODE_ENV: 'development' | 'production'
    }
  }
}

export {}
