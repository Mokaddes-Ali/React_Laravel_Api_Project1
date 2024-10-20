<?php

namespace App\Http\Controllers;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ClientController extends Controller
{


    public function index()
    {

        $client = Client::orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => true,
            'data' => $client
        ]);


    }




    public function show($id)
    {
        $client= Client::find($id);

         if ($client === null) {
             return response()->json([
                 'status' => false,
                 'message' => 'Service not found'
             ]);
         }
         return response()->json([
             'status' => true,
             'data' =>$client
         ]);
     }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:40',
            'email' => 'required',
            'number' => 'required',
            'address' => 'required',
            'pic' => 'required|image|mimes:jpeg,png,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $image_rename = '';
        if ($request->hasFile('pic')) {
            $image = $request->file('pic');
            $ext = $image->getClientOriginalExtension();
            $image_rename = time() . '_' . rand(100000, 10000000) . '.' . $ext;
            $image->move(public_path('images'), $image_rename);
        }

        $client = Client::insertGetId([
            'name' => $request['name'],
            'email' => $request['email'],
            'number' => $request['number'],
            'address' => $request['address'],
            'pic' => $image_rename ,
        ]);

        $client->save();

        return response()->json([
            'status' => true,
            'message' => 'Service added successfully'
        ]);
    }



    public function edit($id){
        // $record = Client::findOrFail($id);
        // return view('admin.client.edit', compact('record'));
    }

    public function update(Request $request, $id){

        $client= Client::find($id);

        if ($client === null) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found'
            ]);
        }

         //dd($request->all());
         $validator = Validator::make($request->all(),[
            'name' => 'required|max:40',
            'email' => 'required',
            'number' => 'required',
            'address' => 'required',
            'pic' => 'nullable|mimes:jpeg,png,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $oldimg = Client::findOrFail($id);
        $deleteimg=public_path('images/'.$oldimg['pic']);
        $image_rename = '';

        if ($request->hasFile('pic')) {
            $image = $request->file('pic');
            $ext = $image->getClientOriginalExtension();

            if(file_exists($deleteimg)){
                unlink($deleteimg);
              }

            $image_rename = time() . '_' . rand(100000, 10000000) . '.' . $ext;
            $image->move(public_path('images'), $image_rename);
            }
            else{
                $image_rename=$oldimg['pic'];
            }

            $service = Client::where('id',$id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'number' => $request->number,
            'address' => $request->address,
            'pic' => $image_rename,
        ]);

        $client->save();

        return response()->json([
            'status' => true,
            'message' => 'Service updated successfully'
        ]);

    }


    public function destroy($id){
        $id=intval($id);
        $client = Client::find($id);
        if ($client) {
            $imagePath = public_path('images/' . $client->pic);
            if (file_exists($imagePath)) { // Check if it's a file
                unlink($imagePath);
            }
            $client->delete();

            return response()->json([
                'status' => true,
                'message' => 'Service deleted successfully'
            ]);

        }

    }
}
