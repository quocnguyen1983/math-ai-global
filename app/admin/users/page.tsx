import prisma from "@/lib/prisma"

export default async function UsersPage() {

  const users = await prisma.user.findMany()

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 to-slate-900 text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        Danh sách Users
      </h1>

      <table className="w-full border">

        <thead>
  <tr className="bg-gray-200 text-black font-semibold">
    <th className="p-3">Email</th>
    <th className="p-3">Plan</th>
    <th className="p-3">Questions</th>
    <th className="p-3">Tokens</th>
    <th className="p-3">Ngày đăng ký</th>
    <th className="p-3">Action</th>
  </tr>
</thead>

        <tbody>

          {users.map((user: any) => (
            <tr key={user.id} className="border-t">

  <td className="p-3">{user.email}</td>

  <td className="p-3">{user.plan}</td>

  <td className="p-3">{user.questionsUsed}</td>

  <td className="p-3">{user.tokensUsed}</td>

  <td className="p-3">
    {new Date(user.createdAt).toLocaleDateString()}
  </td>

  <td className="p-3">
    <button className="bg-red-500 text-white px-3 py-1 rounded">
      Delete
    </button>
  </td>

</tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}