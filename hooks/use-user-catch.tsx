import prisma from "@/lib/prisma";

const useUserCatch = async (user: any) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id
    }
  })

  if (!existingUser) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`
      }
    })
  }
}

export default useUserCatch;