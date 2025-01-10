<?php

namespace App\Http\Controllers;
use App\Models\Status;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StatusController extends Controller
{
    public function newRemark(Request $request)
{
    // Validate the incoming request data
    $validatedData = $request->validate([
        'Enquiry_id' => 'required|string|max:255',
        'remark' => 'required|string'
    ]);

    try {
        $userName = Auth::user()->name;
        Status::create([
            'Enquiry_id' => $validatedData['Enquiry_id'],
            'remark' => $validatedData['remark'],
            'updated_by' => $userName,
        ]);

        // Return a success response
        return response()->json(['message' => 'Spare Parts information saved successfully'], 200);
    } catch (\Exception $e) {
        // Handle any exceptions that occur
        return response()->json(['error' => 'Failed to save information'], 500);
    }
}


// public function statusByID(Request $request)
// {
//     // Fetch records from the status table based on Enquiry_id
//     $enquiryId = $request->id;  // Assuming you pass the Enquiry_id as 'id'
//     $enquiries = Status::where('Enquiry_id', $enquiryId)->get();
    
//     // Return the data as a JSON response
//     return response()->json($enquiries);
// }


public function statusByID($id)
{
    try {
        // Find the Inquiry by ID
        $Status = Status::where('Enquiry_id', $id)->get();

        // Check if inquiry exists
        if (!$Status){
            return response()->json(['error' => 'Status not found'], 404);
        }

        // Return the inquiry data as a response
        return response()->json($Status, 200);
    } catch (\Exception $e) {
        // Handle any exceptions that occur
        return response()->json(['error' => 'Failed to retrieve Status', 'details' => $e->getMessage()], 500);
    }
}

}
