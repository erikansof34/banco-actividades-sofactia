import { useState, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { MainContent } from "./main-content"
import { activities } from "../lib/activities"

export function ActivityViewer() {
    const [selectedCourse, setSelectedCourse] = useState("course1")
    const [selectedActivity, setSelectedActivity] = useState(null)
    const [viewMode, setViewMode] = useState("preview")
    const [mobileView, setMobileView] = useState(false)

    // Initialize selected activity
    useEffect(() => {
        if (!selectedActivity && activities[selectedCourse]?.[0]) {
            setSelectedActivity(activities[selectedCourse][0])
        }
    }, [selectedCourse, selectedActivity])

    // Handle course change
    const handleCourseChange = (course) => {
        setSelectedCourse(course)
        setSelectedActivity(activities[course][0])
    }

    // Reset mobile view when changing activities
    useEffect(() => {
        setMobileView(false)
    }, [selectedActivity])

    if (!selectedActivity) return (
        <div className="flex items-center justify-center h-screen">
            <p>Cargando actividades...</p>
        </div>
    )

    return (
        <div className="flex h-screen bg-background w-[100vw]">
            <Sidebar
                selectedCourse={selectedCourse}
                selectedActivity={selectedActivity}
                onCourseChange={handleCourseChange}
                onActivitySelect={setSelectedActivity}
            />
            <MainContent
                activity={selectedActivity}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                mobileView={mobileView}
                onMobileViewChange={setMobileView}
            />
        </div>
    )
}