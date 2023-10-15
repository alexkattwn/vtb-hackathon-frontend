export default function useOptimalPoint(points: any, targetCoordinate: any) {
    let optimalPoint = null
    let minDistance = Infinity
    console.log(points)
    for (const point of points) {
        const distance = calculateDistance(point.coordinate, targetCoordinate)

        if (distance < minDistance) {
            minDistance = distance
            optimalPoint = point
        }
    }

    return optimalPoint
}

function calculateDistance(coordinate1: any, coordinate2: any) {
    const [lat1, lon1] = coordinate1
    const [lat2, lon2] = coordinate2

    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in km

    return distance
}

function deg2rad(deg: any) {
    return deg * (Math.PI / 180)
}