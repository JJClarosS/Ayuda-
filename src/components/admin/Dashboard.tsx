import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ShoppingBag, DollarSign, Clock, Calendar, TrendingUp } from 'lucide-react';
import { salesData, todayStats, orders, reservations } from '../../data/mockData';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const COLORS = ['#ea580c', '#fb923c', '#fdba74', '#fed7aa'];

const ordersByStatus = [
  { name: 'Pendiente', value: orders.filter(o => o.status === 'Pendiente').length },
  { name: 'En preparación', value: orders.filter(o => o.status === 'En preparación').length },
  { name: 'Entregado', value: orders.filter(o => o.status === 'Entregado').length }
];
const BsIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width="20" 
    height="20"
    className="text-orange-600"
    fill="currentColor"
  >
    <text x="4" y="17" fontSize="14" fontWeight="bold">Bs</text>
  </svg>
);

export function Dashboard() {
  return (
    <div className="p-8 space-y-6 bg-orange-50/30">
      <div>
        <h2 className="text-orange-900 mb-2">Dashboard</h2>
        <p className="text-orange-700">Resumen de actividad del día</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-orange-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-orange-900">Pedidos Hoy</CardTitle>
            <ShoppingBag className="w-5 h-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-orange-900">{todayStats.totalOrders}</div>
            <p className="text-orange-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4" />
              +12% vs ayer
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-orange-900">Ventas Hoy</CardTitle>
            <BsIcon/>
          </CardHeader>
          <CardContent>
            <div className="text-orange-900">Bs{todayStats.totalSales.toFixed(2)}</div>
            <p className="text-orange-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4" />
              +8% vs ayer
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-orange-900">Pendientes</CardTitle>
            <Clock className="w-5 h-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-orange-900">{todayStats.pendingOrders}</div>
            <p className="text-orange-600 mt-1">pedidos en cola</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-orange-900">Reservas</CardTitle>
            <Calendar className="w-5 h-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-orange-900">{todayStats.activeReservations}</div>
            <p className="text-orange-600 mt-1">confirmadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-orange-200 bg-white">
          <CardHeader>
            <CardTitle className="text-orange-900">Ventas Semanales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                <XAxis dataKey="name" stroke="#9a3412" />
                <YAxis stroke="#9a3412" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #fed7aa',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="ventas" fill="#ea580c" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-white">
          <CardHeader>
            <CardTitle className="text-orange-900">Estado de Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ordersByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ordersByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders and Reservations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-orange-200 bg-white">
          <CardHeader>
            <CardTitle className="text-orange-900">Pedidos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-lg bg-orange-50 border border-orange-100">
                  <div>
                    <p className="text-orange-900">{order.customerName}</p>
                    <p className="text-orange-600">{order.id} • Bs{order.total.toFixed(2)}</p>
                  </div>
                  <Badge 
                    variant={order.status === 'Entregado' ? 'default' : 'secondary'}
                    className={
                      order.status === 'Entregado' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : order.status === 'En preparación'
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'bg-yellow-600 hover:bg-yellow-700'
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-white">
          <CardHeader>
            <CardTitle className="text-orange-900">Próximas Reservas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reservations.slice(0, 3).map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-4 rounded-lg bg-orange-50 border border-orange-100">
                  <div>
                    <p className="text-orange-900">{reservation.customerName}</p>
                    <p className="text-orange-600">Mesa {reservation.tableNumber} • {reservation.time} • {reservation.guests} personas</p>
                  </div>
                  <Badge 
                    variant={reservation.status === 'Confirmada' ? 'default' : 'secondary'}
                    className={
                      reservation.status === 'Confirmada' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-yellow-600 hover:bg-yellow-700'
                    }
                  >
                    {reservation.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <CardHeader>
          <CardTitle>Accesos Rápidos</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          <Button variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
            Nueva Promoción
          </Button>
          <Button variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
            Ver Reservas Hoy
          </Button>
          <Button variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
            Gestionar Inventario
          </Button>
          <Button variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50">
            Reporte de Ventas
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
