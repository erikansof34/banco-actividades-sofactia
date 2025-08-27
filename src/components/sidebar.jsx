import { ScrollArea } from './ui/scroll-area'
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ThemeToggle } from './theme-toggle'
import { activities } from '../lib/activities'

export function Sidebar({ selectedCourse, selectedActivity, onCourseChange, onActivitySelect }) {
    return (
        <div className="w-80 border-r bg-muted/40 p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Banco de Códigos</h2>
                <ThemeToggle />
            </div>

            <Select value={selectedCourse} onValueChange={onCourseChange}>
                <SelectTrigger className="mt-4">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="course1">Componentes UI</SelectItem>
                    <SelectItem value="course2">Efectos</SelectItem>
                    <SelectItem value="course3">Animaciones</SelectItem>
                </SelectContent>
            </Select>

            <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
                <div className="grid gap-2">
                    {activities[selectedCourse].map((activity, index) => (
                        <Card
                            key={index}
                            className={`cursor-pointer transition-colors hover:bg-accent ${selectedActivity === activity ? 'border-primary' : ''
                                }`}
                            onClick={() => onActivitySelect(activity)}
                        >
                            <div className="flex p-4">
                                {activity.img && (
                                    <img
                                        src={activity.img}
                                        alt={activity.title}
                                        className="w-20 h-15 object-cover rounded-md mr-4"
                                    />
                                )}
                                <CardHeader className="p-0">
                                    <CardTitle className="text-sm">{activity.title}</CardTitle>
                                    <CardDescription className="text-xs">{activity.content}</CardDescription>
                                </CardHeader>
                            </div>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}