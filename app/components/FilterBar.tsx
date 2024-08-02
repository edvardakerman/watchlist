import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ChildComponentProps {
    onStateChange: (value: string) => void;
}

export default function SelectScrollable({ onStateChange }: ChildComponentProps) {

    return (
        <Select onValueChange={onStateChange}>
            <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue placeholder="Filter by genre" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Action">Action</SelectItem>
                    <SelectItem value="Adventure">Adventure</SelectItem>
                    <SelectItem value="Animation">Animation</SelectItem>
                    <SelectItem value="Comedy">Comedy</SelectItem>
                    <SelectItem value="Crime">Crime</SelectItem>
                    <SelectItem value="Documentary">Documentary</SelectItem>
                    <SelectItem value="Drama">Drama</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                    <SelectItem value="Fantasy">Fantasy</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Horror">Horror</SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Mystery">Mystery</SelectItem>
                    <SelectItem value="Romance">Romance</SelectItem>
                    <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                    <SelectItem value="TV Movie">TV Movie</SelectItem>
                    <SelectItem value="Thriller">Thriller</SelectItem>
                    <SelectItem value="War">War</SelectItem>
                    <SelectItem value="Western">Western</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
