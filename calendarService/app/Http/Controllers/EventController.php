<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    public function index(){
        $event = Event::all();
        return response()->json([
            'status' => 200,
            'events'=> $event
        ]);

    }

    public function show($id){
        $event = Event::find($id);
        return $event;
    }

    public function store(Request $request){
        $event = Event::create([
            'title' => $request->title,
            'description' => $request->description,
            'date' => $request->date,
            'userid' => $request->userid,
        ]);
        return response()->json([
            'status' => 200,
            'event' => $event,
            'message' => 'Başarili'
        ]);
    }

    public function update(Request $request, $id){
        $event = Event::findOrFail($id);
        $event->update($request->all());
        return $event;
    }

    public function destroy($id){
        $event = Event::destroy($id);
        return response()->json([
            'status' => 200,
            'event' => $event,
            'message' => 'Başarili'
        ]);
    }
}
