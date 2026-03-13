import prisma from "@/lib/prisma"

export default async function StatsPage() {

  const totalUsers = await prisma.user.count()
const todayUsers = await prisma.user.count({
  where: {
    createdAt: {
      gte: new Date(new Date().setHours(0,0,0,0))
    }
  }
})
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 to-slate-900 text-white p-10">

      <h1 className="text-3xl font-bold mb-8">
        Thống kê hệ thống
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="p-6 bg-blue-500 text-white rounded-xl">
          Tổng Users
          <div className="text-3xl mt-2">{totalUsers}</div>
        </div>
      <div className="p-6 bg-green-500 text-white rounded-xl">
  Users hôm nay
  <div className="text-3xl mt-2">{todayUsers}</div>
</div>
      </div>

    </div>
  )
}