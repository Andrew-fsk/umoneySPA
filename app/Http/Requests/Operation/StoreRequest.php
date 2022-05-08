<?php

namespace App\Http\Requests\Operation;

use App\Models\Account;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'amount' => 'numeric|required',
            'comment' => 'nullable',
            'category_id' => 'integer|nullable',
            'account_id' => 'integer|required',
            'is_income' => 'boolean'
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $data = $validator->validated();
            $account = Account::find($data['account_id']);
            if (!isset($data['is_income']) && $account->balance < floatval($data['amount'])) {
                $validator->errors()->add('amount', $account->balance . ' on balance');
            }
        });
    }
}
