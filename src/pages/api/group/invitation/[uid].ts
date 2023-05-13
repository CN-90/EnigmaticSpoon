import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../prisma/prisma';


type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    console.log(req.method);
    switch (req.method) {
        case 'GET':
            break;

        case 'POST':
            let data = await createInvitation(req);
            console.log(data);
            return res.status(200).json(data);

        default:
            return res.status(405).end();

    }
}


async function createInvitation(req) {
    const { username, groupId, adminId } = req.body;
    let user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        },
        include: {
            groups: true
        }

    })

    if (!user) {
        console.log("No user with that username was found.");
        return 'No user with that username was found.';
    }

    let invitation = await prisma.invitation.create({
        data: {
            sentToId: parseInt(user.id),
            groupId: parseInt(groupId),
        }
    })


    return `Invitation to ${username} has been sent.`;

}


// model Invitation {
//     id           Int      @id @default(autoincrement())
//     createdAt    DateTime @default(now())
//     updatedAt    DateTime @updatedAt
//     inviteFrom   Admin    @relation(fields: [inviteFromId], references: [id])
//     inviteFromId Int
//     sentTo       User     @relation(fields: [senttoId], references: [id])
//     senttoId     Int
//     viewed       Boolean  @default(false)
//     accepted     Boolean  @default(false)
//     group        Group    @relation(fields: [groupId], references: [id])
//     groupId      Int
//   }