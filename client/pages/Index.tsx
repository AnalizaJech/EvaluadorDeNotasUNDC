import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  GraduationCap,
  Calculator,
  TrendingUp,
  RotateCcw,
} from "lucide-react";

interface GradeData {
  permanentes: number[];
  parciales: number[];
}

export default function Index() {
  const [grades, setGrades] = useState<GradeData>({
    permanentes: [0, 0, 0, 0],
    parciales: [0, 0],
  });

  const [finalGrade, setFinalGrade] = useState(0);
  const [isPassing, setIsPassing] = useState(false);
  const [permanentesAvg, setPermanentesAvg] = useState(0);
  const [parcialesAvg, setParcialesAvg] = useState(0);

  const updatePermanente = (index: number, value: string) => {
    const numValue = Math.max(0, Math.min(20, parseFloat(value) || 0));
    const newPermanentes = [...grades.permanentes];
    newPermanentes[index] = numValue;
    setGrades({ ...grades, permanentes: newPermanentes });
  };

  const updateParcial = (index: number, value: string) => {
    const numValue = Math.max(0, Math.min(20, parseFloat(value) || 0));
    const newParciales = [...grades.parciales];
    newParciales[index] = numValue;
    setGrades({ ...grades, parciales: newParciales });
  };

  const resetGrades = () => {
    setGrades({
      permanentes: [0, 0, 0, 0],
      parciales: [0, 0],
    });
  };

  useEffect(() => {
    // Calculate averages
    const permAvg =
      grades.permanentes.reduce((sum, grade) => sum + grade, 0) / 4;
    const parcAvg = grades.parciales.reduce((sum, grade) => sum + grade, 0) / 2;

    // Calculate final grade (40% permanentes + 60% parciales)
    const final = permAvg * 0.4 + parcAvg * 0.6;

    setPermanentesAvg(permAvg);
    setParcialesAvg(parcAvg);
    setFinalGrade(final);
    setIsPassing(final >= 10.5);
  }, [grades]);

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return "text-green-600";
    if (grade >= 14) return "text-blue-600";
    if (grade >= 10.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getGradeBadgeVariant = (grade: number) => {
    if (grade >= 16) return "default" as const;
    if (grade >= 14) return "secondary" as const;
    if (grade >= 10.5) return "outline" as const;
    return "destructive" as const;
  };

  const getGradeStatus = (grade: number) => {
    if (grade >= 16) return "Excelente";
    if (grade >= 14) return "Muy Bueno";
    if (grade >= 10.5) return "Aprobado";
    return "Reprobado";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              TrackGrades
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Administra tus calificaciones académicas y calcula tu promedio final
            en tiempo real
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Permanentes Section */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Permanentes</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    4 evaluaciones • 40% del total
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {grades.permanentes.map((grade, index) => (
                <div key={index} className="space-y-2">
                  <Label className="text-sm font-medium">
                    Permanente {index + 1}
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    step="0.1"
                    value={grade || ""}
                    onChange={(e) => updatePermanente(index, e.target.value)}
                    className="text-center font-medium"
                    placeholder="0.0"
                  />
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Promedio:</span>
                  <Badge
                    variant={getGradeBadgeVariant(permanentesAvg)}
                    className="font-bold"
                  >
                    {permanentesAvg.toFixed(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parciales Section */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calculator className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Parciales</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    2 exámenes • 60% del total
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {grades.parciales.map((grade, index) => (
                <div key={index} className="space-y-2">
                  <Label className="text-sm font-medium">
                    Parcial {index + 1}
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    step="0.1"
                    value={grade || ""}
                    onChange={(e) => updateParcial(index, e.target.value)}
                    className="text-center font-medium"
                    placeholder="0.0"
                  />
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Promedio:</span>
                  <Badge
                    variant={getGradeBadgeVariant(parcialesAvg)}
                    className="font-bold"
                  >
                    {parcialesAvg.toFixed(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${isPassing ? "bg-green-100" : "bg-red-100"}`}
                >
                  <TrendingUp
                    className={`h-5 w-5 ${isPassing ? "text-green-600" : "text-red-600"}`}
                  />
                </div>
                <div>
                  <CardTitle className="text-xl">Resultado Final</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Calificación calculada
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div
                  className={`text-5xl font-bold ${getGradeColor(finalGrade)} mb-2`}
                >
                  {finalGrade.toFixed(1)}
                </div>
                <Badge
                  variant={isPassing ? "default" : "destructive"}
                  className="text-sm font-semibold px-4 py-1"
                >
                  {getGradeStatus(finalGrade)}
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progreso hacia la aprobación</span>
                    <span>
                      {Math.min(100, (finalGrade / 10.5) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress
                    value={Math.min(100, (finalGrade / 20) * 100)}
                    className="h-2"
                  />
                </div>

                <div className="pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Permanentes (40%):</span>
                    <span className="font-medium">
                      {(permanentesAvg * 0.4).toFixed(1)} pts
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Parciales (60%):</span>
                    <span className="font-medium">
                      {(parcialesAvg * 0.6).toFixed(1)} pts
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{finalGrade.toFixed(1)} / 20</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={resetGrades}
                variant="outline"
                className="w-full"
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reiniciar Notas
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-8">
          <Card className="border-0 shadow-sm bg-blue-50/50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                Sistema de Calificación
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Permanentes: 4 evaluaciones (40% del total)</li>
                <li>• Parciales: 2 exámenes (60% del total)</li>
                <li>• Nota mínima para aprobar: 10.5</li>
                <li>• Escala: 0 - 20 puntos</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-green-50/50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-green-900 mb-2">
                Rangos de Calificación
              </h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 16 - 20: Excelente</li>
                <li>• 14 - 15.9: Muy Bueno</li>
                <li>• 10.5 - 13.9: Aprobado</li>
                <li>• 0 - 10.4: Reprobado</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
