import React from "react"
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from "recharts"
import { useChartData } from "@/Utils/Hooks/useChart"

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"]

const Dashboard = () => {
  const { data = {}, isLoading } = useChartData()
  const {
    students = [],
    genderRatio = [],
    registrations = [],
    gradeDistribution = [],
    lecturerRanks = [],
  } = data

  if (isLoading) return <div className="p-6 text-center">Loading chart data...</div>

  return (
    <div className="p-6 grid gap-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={students}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="faculty" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={genderRatio} dataKey="count" nameKey="gender" cx="50%" cy="50%" outerRadius={80}>
            {genderRatio.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={registrations}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={gradeDistribution}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Radar name="B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.4} />
          <Radar name="C" dataKey="C" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={lecturerRanks}>
          <defs>
            <linearGradient id="colorLecturer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="rank" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorLecturer)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Dashboard