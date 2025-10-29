import { Star } from 'lucide-react';
import { useState } from 'react';
import { reviews as initialReviews } from '../../data/mockData';
import { Review } from '../../types';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({
    customerName: '',
    rating: 5,
    comment: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.customerName.trim() || !newReview.comment.trim()) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const review: Review = {
      id: `R${String(reviews.length + 1).padStart(3, '0')}`,
      customerName: newReview.customerName,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([review, ...reviews]);
    setNewReview({ customerName: '', rating: 5, comment: '' });
    alert('¡Gracias por tu reseña!');
  };

  const averageRating = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return (
    <div className="py-12 bg-card min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">Reseñas de Clientes</h2>
          <p className="text-muted-foreground mt-2">Comparte tu experiencia con nosotros</p>
        </div>

        {/* Rating Summary */}
        <Card className="border-border bg-card shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-destructive">{averageRating.toFixed(1)}</div>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.round(averageRating)
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mt-2">Basado en {reviews.length} reseñas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Review Form */}
        <Card className="border-border bg-card shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Deja tu Reseña</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground">Tu Nombre</Label>
                <Input
                  id="name"
                  value={newReview.customerName}
                  onChange={(e) => setNewReview({ ...newReview, customerName: e.target.value })}
                  placeholder="Nombre completo"
                  className="mt-2 border-border"
                  required
                />
              </div>

              <div>
                <Label className="text-foreground block">Calificación</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoveredRating || newReview.rating)
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="comment" className="text-foreground">Tu Comentario</Label>
                <Textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Cuéntanos sobre tu experiencia..."
                  className="mt-2 border-border"
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white">
                Publicar Reseña
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Todas las Reseñas</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="border-border bg-card shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-foreground font-medium">{review.customerName}</p>
                      <p className="text-muted-foreground text-sm">{new Date(review.date).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}