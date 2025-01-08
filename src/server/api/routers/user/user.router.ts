import { createTRPCRouter, protectedProcedure } from '../../trpc'
import { welcomeUser } from './user.service'

export const userRouter = createTRPCRouter({
  welcome: protectedProcedure.query(({ ctx }) => welcomeUser(ctx.session.user, ctx.db)),
})
