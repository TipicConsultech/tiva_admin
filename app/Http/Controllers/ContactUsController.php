<?php

namespace App\Http\Controllers;

use App\Models\ContactUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;



class ContactUsController extends Controller
{


    public function ScrapVehicleData()
    {
        // Fetch all records from the contact_us table
        $ScrapVehicleData = ContactUs::all();

        // Return the data as a JSON response
        return response()->json($ScrapVehicleData);
    }

    public function getEnquiryById($id)
    {
        // Find the enquiry by ID
        $enquiry = ContactUs::find($id);

        // If the enquiry is found, return it, otherwise return a 404 response
        if ($enquiry) {
            return response()->json(['Enquiry' => $enquiry] , 200);
        } else {
            return response()->json(['message' => 'Enquiry not found'], 404);
        }
    }
    
    /**
     * Store the form input in the database.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'mobile' => 'required|string|max:10',
            'location' => 'required|string|max:255',
            'vehicle_category' => 'required|string',
            'vehicle_manufacturer'=>'required|string',
            'vehicle_registration_number' => 'required|string|max:255',
            "vehicle_description" => 'required|string|max:255',
            "registration_source" => 'required|string|max:255',
            "scrap_purpose"=> 'required|string|max:255',
        ]);

        // Create a new ContactUs instance and save the validated data
        $status= '0';
        ContactUs::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'mobile' => $request->input('mobile'),
            'location' => $request->input('location'),
            'vehicle_category' => $request->input('vehicle_category'),
            'vehicle_manufacturer' => $request->input('vehicle_manufacturer'),
            'vehicle_registration_number' => $request->input('vehicle_registration_number'),
            'vehicle_description' => $request->input('vehicle_description'),
            'registration_source' => $request->input('registration_source'),
            'scrap_purpose' => $request->input('scrap_purpose'),
            'status'=>$status
        ]);

        // Return a success response
        return response()->json(['message' => 'Contact information saved successfully'], 200);
    }





    public function updateStatus(Request $request, $id)
    {
        // Validate the request
        $request->validate([
            'status' => 'required|string|max:255', // Adjust validation rules as needed
        ]);

        // Get the authenticated user's name
        $updatedBy = Auth::user()->name;

        // Find the record by its ID
        $record = ContactUs::find($id);

        if ($record) {
            // Update the fields
            $record->status = $request->input('status');
            $record->updated_by = $updatedBy;

            // Save the record
            $record->save();

            return response()->json([
                'message' => 'Record updated successfully.',
             
            ]);
        } else {
            return response()->json(['message' => 'Record not found.'], 404);
        }
    } 

    public function allScrapEnquriesInMonth($month)
{
    // If the month is a single number, assume the current year
    if (is_numeric($month)) {
        $month = now()->format('Y') . '-' . str_pad($month, 2, '0', STR_PAD_LEFT);
    }

    // Parse the month to get the start and end dates
    $startDate = Carbon::createFromFormat('Y-m', $month)->startOfMonth();
    $endDate = Carbon::createFromFormat('Y-m', $month)->endOfMonth();

    // Count the number of 'buy' enquiries (type = 1, status = 0)
    $new = ContactUs::where('status',"0")
        ->whereBetween('created_at', [$startDate, $endDate])
        ->count();

    // Count the number of 'sell' enquiries (type = 2, status = 0)
    $pending = ContactUs::where('status',"1")
        ->whereBetween('created_at', [$startDate, $endDate])
        ->count();

    $completed = ContactUs::where('status',"2")
        ->whereBetween('created_at', [$startDate, $endDate])
        ->count();

    // Return the totals as a JSON response
    return response()->json([
        'new' => $new,
        'pending' => $pending,
        'completed' => $completed

    ]);
}

public function allScrapEnquriesByStatus($status,$month)
{
    // If the month is a single number, assume the current year
    if (is_numeric($month)) {
        $month = now()->format('Y') . '-' . str_pad($month, 2, '0', STR_PAD_LEFT);
    }

    // Parse the month to get the start and end dates
    $startDate = Carbon::createFromFormat('Y-m', $month)->startOfMonth();
    $endDate = Carbon::createFromFormat('Y-m', $month)->endOfMonth();

    // Count the number of 'buy' enquiries (type = 1, status = 0)
    $data = ContactUs::where('status',$status)
        ->whereBetween('created_at', [$startDate, $endDate])
        ->get();
        //->count();

    // Count the number of 'sell' enquiries (type = 2, status = 0)
    // $pending = ContactUs::where('status',"1")
    //     ->whereBetween('created_at', [$startDate, $endDate])
    //     ->count();

    // $completed = ContactUs::where('status',"2")
    //     ->whereBetween('created_at', [$startDate, $endDate])
    //     ->count();

    // Return the totals as a JSON response
    return response()->json(
     $data
    );
}

}





