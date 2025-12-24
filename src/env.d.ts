declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      MONGO_LOCAL_URI: string
      MONGO_REMOTE_URI: string
      JWT_SECRET: string
      NODE_ENV: 'production' | 'development'
    }
  }

  namespace Express {
    interface Request {
      userId: string | null
    }
  }
}

export {}
